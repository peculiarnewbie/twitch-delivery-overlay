import { Storage } from "@plasmohq/storage"

const resizeVideo = async (size?: number) => {
  let videoWidth: number
  if (size) videoWidth = size
  else {
    videoWidth = parseInt(await storage.get("video-width"))
  }
  console.log("width:", await storage.get("video-width"))

  const mainVideo = document.getElementsByTagName("video")[0]
  mainVideo.style.width = `${videoWidth}%`
  mainVideo.style.left = "50%"
  mainVideo.style.transform = "translateX(-50%)"
}
const storage = new Storage({
  area: "sync",
  allCopied: true,
  copiedKeyList: ["video-width", "wth"]
})

chrome.runtime.onMessage.addListener(async function (message, tab, res) {
  if (message.name == "resize") {
    storage.set("video-width", message.body)
    resizeVideo(message.body)
  }
})
