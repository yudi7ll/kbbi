import { Accessor, JSX, Setter } from "solid-js";
import Times from '../../assets/icons/times.svg?component-solid'

interface TooltipProps {
  children: JSX.Element
  show: Accessor<boolean>
  setShow: Setter<boolean>
}

export default function Tooltip(props: TooltipProps) {
  const { children, show, setShow } = props

  return (
    <>
      {show() ? (
        <div class="bg-red-400 text-white rounded p-4 max-w-[300px] absolute z-50 transform translate-x-4 translate-y-4">
          <button class="absolute right-0 top-0 hover:bg-red-600 p-1 transition text-sm" type="button" onClick={() => setShow(false)}>
            <Times class="w-4 h-auto fill-white" />
          </button>
          <p class="text-xs">{children}</p>
        </div>
      ) : null
      }
    </>
  )
}
