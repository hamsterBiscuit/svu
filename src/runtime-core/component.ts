import {
    VNode,
    ComponentInstance
} from '../shared/svu';

import {
    isFunction,
    isObject
} from '../shared';

export function createComponentInstance(vnode: VNode){
    const instance: ComponentInstance = {
        vnode,
        type: vnode.type,
        subTree: null!,
        update: null!,
        proxy: null,
        render: null,
        effects: null,

        props: {},
        setupState: {},

        isMounted: false
    }
    return instance;
}

// 组件初始化
export function setupComponent(instance: ComponentInstance){
    const Component = instance.type;
    const { setup } = Component;
    if(setup){
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}

export function handleSetupResult(
    instance: ComponentInstance,
    setupResult: unknown,
){  
    // 返回一个h函数（jsx）
    if(isFunction(setupResult)){
        instance.render = setupResult;
    }else if(isObject(setupResult)){
        // 模板方法  需要 vue 的编译模块
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}

function finishComponentSetup(
    instance: ComponentInstance
){
    const Component = instance.type;
    if(!instance.render){
        if(Component.template && !Component.render){
            // TODO：编译模块  等runtime搞完再看这块
            // Component.render = compile()
        }
        instance.render = Component.render
    }
}