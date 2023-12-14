import { useEffect, useState } from "react"

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
    await storage.primaryClient.set({ ["video-width"]: data })
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
        padding: 16,
        width: "200px"
      }}>
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input
        onChange={(e) => setData(parseInt(e.target.value))}
        value={data}
        type="number"
      />
      <button
        onClick={() => {
          setWidth()
        }}>
        set
      </button>
      <p>{data}</p>
      <p>in storage: {inStorage}</p>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
