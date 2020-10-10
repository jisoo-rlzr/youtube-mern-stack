import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import DropZone from 'react-dropzone'

const { Title } = Typography
const { TextArea } = Input

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
]

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" }
]

function VideoUploadPage() {

  const [videoTitle, setVideoTitle] = useState("")
  const [description, setDescription] = useState("")
  const [privateValue, setPrivate] = useState(0)
  const [categoryValue, setCategory] = useState("Film & Animation")

  return (
    <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
      <div style={{ textAlign:'center', marginBottom:'2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <DropZone
            onDrop
            multiple
            maxSize
          >
            {
              ({ getRootProps, getInputProps }) => (
                <div style={{ display:'flex', width:'300px', height:'240px', border:'1px solid lightgray', alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                  <input {...getInputProps()}/>
                  <Icon type="plus" style={{ fontSize:'3rem' }}/>
                </div>
              )
            }
          </DropZone>
          {/* Thumbnail */}
          <div>
            <img src="" alt=""/>
          </div>
        </div>
        <br/>
        <br/>
        <label>Title</label>
        <Input
          onChange={(e) => {setVideoTitle(e.currentTarget.value)}}
          value={videoTitle}
        />
        <br/>
        <br/>
        <label>Description</label>
        <TextArea
          onChange={(e) => {setDescription(e.currentTarget.value)}}
          value={description}
        />
        <br/>
        <br/>
        <select onChange={(e) => {setPrivate(e.currentTarget.value)}}>
          {
            Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
            ))
          }
        </select>
        <br/>
        <br/>
        <select onChange={(e) => {setCategory(e.currentTarget.value)}}>
          {
            Category.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
            ))
          }
        </select>
        <br/>
        <br/>
        <Button type="primary" size="large" onClick>Submit</Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
