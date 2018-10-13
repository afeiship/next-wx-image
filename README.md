# next-wx-image
> Wechat api for image part.


## install:
```bash
npm install -S afeiship/next-wx-image --registry=https://registry.npm.taobao.org
```

## usage:
```js
import NxWxImage from 'next-wx-image';

// choose:
NxWxImage.choose(inOptions);

// preview:
NxWxImage.preview(inIndex,inItems);

// upload:
NxWxImage.upload(inLocalId, inOptions);

// uploads:
NxWxImage.uploads(inLocalIds, inOptions);

// download:
NxWxImage.download(inLocalIds, inOptions);

```
## todos
- use __WEIXIN_READY___ instead of wx.ready
