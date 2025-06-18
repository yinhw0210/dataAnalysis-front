import type { UploadFile, UploadProps } from 'antd'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, message, Row, Slider, Space, Typography, Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'

const { Title, Text } = Typography

function Test() {
  const [image, setImage] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [brushSize, setBrushSize] = useState<number>(10)

  // 处理图片上传
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setCanvasSize({
          width: img.width,
          height: img.height,
        })
        setImage(event.target?.result as string)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
    return false
  }

  // 上传组件属性配置
  const uploadProps: UploadProps = {
    name: 'file',
    accept: 'image/*',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('只能上传图片文件!')
        return Upload.LIST_IGNORE
      }
      handleImageUpload(file)
      return false
    },
    maxCount: 1,
    showUploadList: false,
  }

  // 初始化Canvas
  useEffect(() => {
    if (image && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // 先填充黑色背景
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // 确保图片已加载且不为null
        const imgElement = imageRef.current
        if (imgElement && imgElement.complete) {
          // 图片已加载完成，直接绘制
          ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
        } else if (imgElement) {
          // 图片未加载完成，添加加载事件
          imgElement.onload = () => {
            // 再次检查确保imgElement不为null
            if (imgElement && ctx) {
              ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)
            }
          }
        }
      }
    }
  }, [image, canvasSize])

  // 鼠标按下开始绘制
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current)
      return

    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.beginPath()
      ctx.moveTo(x, y)
      // 使用destination-out模式，涂抹区域变为透明
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)' // 完全不透明的白色
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
    }
  }

  // 鼠标移动时绘制
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current)
      return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  // 鼠标释放停止绘制
  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // 导出涂抹轨迹图
  const exportMask = () => {
    if (!canvasRef.current)
      return

    // 创建一个临时Canvas用于导出
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvasSize.width
    tempCanvas.height = canvasSize.height
    const tempCtx = tempCanvas.getContext('2d')
    
    if (tempCtx) {
      // 1. 首先填充纯黑色背景
      tempCtx.fillStyle = 'black'
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
      
      // 2. 获取原Canvas的像素数据
      const originalCanvas = canvasRef.current
      const originalCtx = originalCanvas.getContext('2d')
      
      if (originalCtx) {
        const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height)
        const data = imageData.data
        
        // 3. 创建新的像素数据，将透明区域变为白色
        const newImageData = tempCtx.createImageData(tempCanvas.width, tempCanvas.height)
        const newData = newImageData.data
        
        for (let i = 0; i < data.length; i += 4) {
          // 检查原Canvas中的像素透明度
          if (data[i + 3] < 255) { // 如果有透明度（被涂抹的区域）
            // 设置为白色
            newData[i] = 255     // R
            newData[i + 1] = 255 // G
            newData[i + 2] = 255 // B
            newData[i + 3] = 255 // A
          } else {
            // 保持黑色
            newData[i] = 0       // R
            newData[i + 1] = 0   // G
            newData[i + 2] = 0   // B
            newData[i + 3] = 255 // A
          }
        }
        
        // 4. 将新的像素数据绘制到临时Canvas上
        tempCtx.putImageData(newImageData, 0, 0)
      }
    }
    
    // 导出临时Canvas的内容
    const dataUrl = tempCanvas.toDataURL('image/png')
    
    // 创建下载链接
    const link = document.createElement('a')
    link.download = 'mask.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>图片涂抹工具</Title>
        <Text type="secondary" style={{ marginBottom: '24px', display: 'block' }}>
          上传图片，使用鼠标在图片上涂抹，导出黑底白色涂抹轨迹图
        </Text>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} type="primary">
                选择图片
              </Button>
            </Upload>
          </Col>

          {image && (
            <>
              <Col span={24}>
                <Card title="画笔设置" size="small">
                  <Row align="middle" gutter={16}>
                    <Col span={4}>
                      <Text>画笔大小:</Text>
                    </Col>
                    <Col span={16}>
                      <Slider
                        min={1}
                        max={50}
                        value={brushSize}
                        onChange={value => setBrushSize(value)}
                      />
                    </Col>
                    <Col span={4}>
                      <Text>
                        {brushSize}
                        px
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <div style={{ position: 'relative', border: '1px solid #f0f0f0', display: 'inline-block' }}>
                  <div style={{ position: 'relative', width: canvasSize.width, height: canvasSize.height }}>
                    <img
                      ref={imageRef}
                      src={image}
                      alt="上传的图片"
                      style={{
                        display: 'block',
                        width: canvasSize.width,
                        height: canvasSize.height,
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        mixBlendMode: 'multiply', // 使用混合模式让涂抹效果更明显
                      }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <Space>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={exportMask}
                  >
                    导出涂抹轨迹图
                  </Button>
                </Space>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </div>
  )
}

export default Test
