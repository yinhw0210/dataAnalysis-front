export function demo() {
  return 'demo'
}

export function downloadFile(fileUrl: string, name?: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      let blob = xhr.response;
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name || "未命名";
      a.click();
      window.URL.revokeObjectURL(url);

      resolve(true);
    };
    xhr.onerror = () => {
      reject(false);
    };
    xhr.send();
  });
}

export function downloadFile2() {
  // 创建一个 XMLHttpRequest 对象 
  const xhr = new XMLHttpRequest();

  // 设置请求头
  xhr.open('GET', 'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0d00fg10000c4sed5rc77ubasner540&ratio=720p&line=0');

  // 监听 readyState 属性
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      // 请求已完成
      if (xhr.status === 200) {
        // 将文件数据流保存到本地文件中
        const blob = new Blob([xhr.response]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.txt';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // 请求失败
        console.error('文件下载失败');
      }
    }
  };

  // 发送请求
  xhr.send();
}