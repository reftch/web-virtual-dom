
interface ApplicationState {
  count: number;
  isEnabled: boolean;
  message: string;
}

export namespace useStore {

  const _state: ApplicationState = { 
    count: 0,
    isEnabled: true,
    message: 'Custom message'
  };

  // const _components = new Map<any, string[]>();

  // const _updateModel = () => {
  //   _components.forEach((parameters: string[], component: any) => {
  //     const componentsToUpdate = <any>[];
  //     parameters.forEach(p => {
  //       if (_state[p] !== undefined) {
  //         component[p] = _state[p];
  //         if (!componentsToUpdate.includes(component)) {
  //           componentsToUpdate.push(component);
  //         }
  //       }
  //     })
  //     componentsToUpdate.forEach(c => c.reconciliation());
  //   })
  // }

  // export const subscribe = (component: any, parameters: string[]) => {
  //   _components.set(component, parameters);
  // }

  // export const unsubscribe = (component: any) => {
  //   _components.delete(component);
  // }

  export const getters = () => {
    const getState = () => {
      return _state;
    }

    const getCount = () => {
      return _state.count;
    }

    const getMessage = () => {
      return _state.message;
    }

    return {
      getCount,
      getState,
      getMessage,
    }
  }

  export const actions = () => {

    const setMessage = (value: string) => {
      _state.message = value;
    }

    const setCount = (value: number) => {
      _state.count = value;
    }

    const setEnabled = (value) => {
      _state.isEnabled = value;
    }

    return {
      setCount,
      setEnabled,
      setMessage,
    }
  }

}
