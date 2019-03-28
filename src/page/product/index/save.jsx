import React from 'react';
import Mutil from 'util/mm.jsx';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';

const _mm = new Mutil();

class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      parentCategoryId: 0,
      subImages: []
    }
  }

  // 品类选择器变化
  onCateoryChange(categoryId, parentCategoryId) {
    console.log(categoryId, parentCategoryId, 'lkkk')
  }

  // 图片上传成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }

  // 图片上传失败
  onUploadError(errMsg) {
    _mm.errTips(errMsg);
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="清输入商品名称" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="请输入商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品分类</label>
            <CategorySelector onCateoryChange={
              (categoryId, parentCategoryId) => this.onCateoryChange(categoryId, parentCategoryId)}></CategorySelector>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-5">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="请输入商品价格" />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-5">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="请输入商品库存" />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map(
                  (image, index) => (<img key={index} src={image.url} />)
                ) : (<div>请上传图片</div>)
              } 
            </div>
            <div className="col-md-10">
              <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
              onError={(errMsg) => this.onUploadError(errMsg)}></FileUploader>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              2222222222222
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary">添加</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave;