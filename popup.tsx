import { useEffect, useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const storage = new Storage({
    area: "sync",
    allCopied: true,
    copiedKeyList: ["video-width"]
  })
  storage.setNamespace("man")
  const [data, setData] = useState(100)
  const [inStorage, setInStorage] = useState(0)

  const getWidth = async () => {
    let size = await storage.get("video-width")
    setData(parseInt(size))
    setInStorage(parseInt(size))
    console.log("get width:", size)
  }

  const setWidth = async () => {
    await storage.set("video-width", data)
    const resp = await sendToContentScript({
      name: "resize",
      body: data
    })
    const size = await storage.get("video-width")
    setInStorage(parseInt(size))
  }

  useEffect(() => {
    getWidth()
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        width: "200px",
        margin: "0px"
      }}>
      <p style={{ margin: "0px", marginBottom: "10px" }}>change size:</p>
      <p style={{ margin: "0px" }}>{data}</p>
      <input
        min={70}
        onChange={(e) => setData(parseInt(e.target.value))}
        value={data}
        type="range"
      />
      <button
        onClick={() => {
          setWidth()
        }}>
        set video size
      </button>
      <p style={{ marginTop: "20px", fontWeight: 700 }}>
        current size: {inStorage}
      </p>
      <p style={{ marginBottom: "0px" }}>
        {"made by: "}
        <a href="https://peculiarnewbie.com" target="_blank">
          peculiarnewbie
        </a>
      </p>
    </div>
  )
}

export default IndexPopup
