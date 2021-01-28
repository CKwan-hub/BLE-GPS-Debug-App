/* @jsx m */
import m from 'mithril';

// Standard button component

export const Button = () => {
  return {
    view: (vnode) => {
      return (
        <div class="">
          <button
            id={vnode.attrs.id ? vnode.attrs.id : ''}
            class={vnode.attrs.class ? '' + vnode.attrs.class : ''}
            type={vnode.attrs.type ? vnode.attrs.type : ''}
            onclick={vnode.attrs.onClick ? vnode.attrs.onClick : ''}
            disabled={vnode.attrs.loading}
          >
            {vnode.attrs.text}
            &nbsp;&nbsp;&nbsp;
            {vnode.attrs.loading ? <i class=""></i> : ''}
          </button>
        </div>
      );
    },
  };
};
