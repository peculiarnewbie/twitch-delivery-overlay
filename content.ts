import mcd from "data-base64:~assets/mcd.png"
import styleText from "data-text:./style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoGetStyle
} from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://www.twitch.tv/*", "https://twitch.tv/*"],
  world: "MAIN"
}
/*
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.getElementsByTagName(`video`)[0].parentElement

console.log(
  "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
)
export default function PlasmoMainUI() {
  return (
    <img
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      src={mcd}></img>
  )
}
*/

const tempImg = document.createElement("img")
tempImg.style.width = "100%"
tempImg.style.backgroundColor = "transparent"
tempImg.style.pointerEvents = "none"
tempImg.style.position = "fixed"
tempImg.src = mcd
tempImg.id = "thetwitchoverlay"
tempImg.style.top = "50%"
tempImg.style.transform = "translateY(-50%)"

const tempP = document.createElement("div")
tempP.style.width = "50%"
tempP.style.fontSize = "36pt"
tempP.innerText = "peculiarnewbie here"

const videoOverlay = document.getElementsByClassName("video-player__overlay")

videoOverlay[0].prepend(tempImg)

const reduceVideoSize = async () => {
  const storage = new Storage({
    area: "sync",
    allCopied: true,
    copiedKeyList: ["video-width", "wth"]
  })
  storage.setNamespace("man")
  await storage.set("man", 80)
  await storage.set("wth", "smh")
  const videoWidth = await storage.primaryClient.get("video-width")
  console.log("width:", await storage.get("video-width"))

  console.log("man")

  console.log("all storage", storage.getNamespacedKey(""), "k")
  console.log(await storage.get("wth"), await storage.get("man"))

  const mainVideo = document.getElementsByTagName("video")[0]
  mainVideo.style.width = `${videoWidth}%`
  mainVideo.style.left = "50%"
  mainVideo.style.transform = "translateX(-50%)"
}

reduceVideoSize()
