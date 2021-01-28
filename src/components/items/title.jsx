/* @jsx m */
import m from 'mithril';

export const Title = () => {
  return {
    view: (vnode) => {
      return (
        <div>
          <div>{vnode.attrs.info} </div>
        </div>
      );
    },
  };
};
