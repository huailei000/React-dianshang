import React from 'react';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import './category-selector.scss';

const _mm = new Mutil();
const _product = new Product();

// 品类选择器
class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }

  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }

  // 选择一级分类
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []  
    }, () => {
      this.loadSecondCategory();
      this.onPropsCateoryChange();
    })
  }

  // 选择二级分类
  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCateoryChange();
    })
  }
  // 传给父组件选中得结果
  onPropsCateoryChange() {
    // 判断是不是有props里得回调函数
    let categoryChangable = typeof this.props.onCateoryChange === 'function';
    // 如果有二级品类
    if(this.state.secondCategoryId) {
      categoryChangable && this.props.onCateoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else {
      categoryChangable && this.props.onCateoryChange(this.state.firstCategoryId, 0)
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
        onChange={(e) => this.onFirstCategoryChange(e)}>
          <option value="">一级分类</option>
          {
            this.state.firstCategoryList.map(
              (category, index) =>  <option value={category.id} key={index}>{category.name}</option>
            )
          }
        </select>
        {
          this.state.secondCategoryList.length ?
            (<select className="form-control cate-select"
            onChange={(e) => this.onSecondCategoryChange(e)}>
              <option value="">二级分类</option>
              {
                this.state.secondCategoryList.map(
                  (category, index) =>  <option value={category.id} key={index}>{category.name}</option>
                )
              }
            </select>) : null
        }
      </div>
    )
  }
}

export default CategorySelector;