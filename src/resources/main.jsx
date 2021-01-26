/* @jsx m */
import m from 'mithril'
import { Test } from '../components/test'

export const Main = () => {

    let testString = "Hello World!"

    return {

        view: (vnode) => {

            return (
                <div>
                    Template for Mithril!
                    {m(Test, { info: testString })}
                </div>
            )
        }
    }
}