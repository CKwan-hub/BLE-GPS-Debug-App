/* @jsx m */
import m from 'mithril'

// Display component for rendering information to DOM

export const Screen = () => {

    // TODO: 
    /* 
        - Style screen 
        - Define initial display
        - Define function for realtime updates/latency redraw for vnode.attrs.content
    */


    return {
        oninit: (vnode) => {

        },
        oncreate: (vnode) => {

        },
        onupdate: (vnode) => {

        },
        view: (vnode) => {
            return (
                <div class={vnode.attrs.class} id={vnode.attrs.id}>{vnode.attrs.title}
                    <div class={vnode.attrs.contentClass} id={vnode.attrs.contentID}>{vnode.attrs.content}</div>
                </div>
            )
        }
    }
}