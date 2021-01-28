/* @jsx m */
import m from 'mithril';

// Standard dropdown component

export const Dropdown = () => {
  function getOptions(items, defaultOption, selected) {
    let options = [];
    options.push(<option value="--">{defaultOption}</option>);
    for (let key in items) {
      options.push(
        <option value={key} selected={selected === key ? true : false}>
          {items[key]}
        </option>
      );
    }
    return options;
  }
  return {
    oninit: (vnode) => {},
    view: (vnode) => {
      return (
        <div class={vnode.attrs.class}>
          <label
            class=""
            aria-label={vnode.attrs.labelContent}
            for={vnode.attrs.id}
          >
            {vnode.attrs.labelContent}
          </label>
          <select id={vnode.attrs.id} name={}>
            {getOptions(
              vnode.attrs.content,
              vnode.attrs.default,
              vnode.attrs.selected
            )}
          </select>
        </div>
      );
    },
  };
};
