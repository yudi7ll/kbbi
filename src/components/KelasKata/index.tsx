import { createSignal, For } from "solid-js"
import Tooltip from "../Tooltip"

export default function KelasKata({ kelasKata }: { kelasKata: string }) {
  const _kelasKata = kelasKata.match(/(\w+)\[(.*?)\]/g) ?? []
  const convertedKelasKata = _kelasKata.map(item => item.match(/(\w+)\[(.*?)\]/) ?? [])

  return (
    <>
      <For each={convertedKelasKata}>
        {([, code, description]) => {
          const [showTooltip, setShowTooltip] = createSignal<boolean>(false)

          return (
            <div>
              <button class="hover:underline transition text-red-500 italic" type="button">
                <em title={description} onClick={() => setShowTooltip(prev => !prev)}>{code}</em>
              </button>
              <Tooltip show={showTooltip} setShow={setShowTooltip}>{description}</Tooltip>
            </div>
          )
        }}
      </For>
    </>
  )
}
