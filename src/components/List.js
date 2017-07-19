import React, { Component } from 'react';
import axios from 'axios';

import Row from './Row'


class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tree : [],
      depth : 0
    }
  }

  jsonBuilder(arrays){
      let build = {};

      arrays.map((array,i)=>{
          var obj = arrays[i];
          obj.children = [];

          build[obj.ID] = obj;

          var parent = obj.parentID || '-';
          if(!build[parent]){
              build[parent] = {
                  children: []
              };
          }
          build[parent].children.push(obj);
      })

      return build['-'].children;
  }

  accordionItem = (itemId) => {
    this.actions(this.state.tree, itemId, "accordion");
  }

  removeItem = (itemId) => {
    this.actions(this.state.tree, itemId, "remove");
  }

  actions(data, id, type){

    data.map((item, key) => {
      if (item.ID===id) {
        if (type==="remove") {
          data.splice(key, 1);
          this.setState({data: data});
        }else{
            if (item.showChilds===true || item.showChilds===undefined) {
              item.showChilds = false;
              this.setState({data: data});
            }else{
              item.showChilds = true;
              this.setState({data: data});
            }
        }
      }else{
        this.actions(item.children, id, type)
      }
    })

  }


  componentDidMount() {
    axios
      .get(`https://gist.githubusercontent.com/burakcan/ca77e8fc11a1455cc1962ad7318b8fbc/raw/b446a09888882df7273f17d2ff7ebf4820de4152/dataset.json`)
      .then((res) => {
        this.setState({ tree : this.jsonBuilder(res.data) });
      })
  }

  render() {
    return <div>
      {this.state.tree.map((item) => {
        return (
          <div key={item.ID} className={item.showChilds===true || item.showChilds===undefined ? "table show-childs" : "table hide-childs"}>
            <div className={"table-row depth-" + this.state.depth}>
              <div className="table-col">{item.ID}</div>
              <div className="table-col">{item.Name}</div>
              <div className="table-col">{item.City}</div>
              <div className="table-col">{item.Phone}</div>
              <div className="table-col">
                <button onClick={(e) => this.removeItem(item.ID)}>
                  <i className="icon-trash"></i>
                </button>
              </div>
              <button className={item.children.length===0 ? 'expand-arrow hidden' : 'expand-arrow'} onClick={(e) => this.accordionItem(item.ID)}>
                <i className={item.showChilds===true || item.showChilds===undefined ? 'icon-down-open' : 'icon-up-open'} ></i>
              </button>
            </div>
            {item.children.map(item =>
              <Row key={item.ID} item={item} removeItem={this.removeItem} accordionItem={this.accordionItem} depth={this.state.depth + 1} />
            )}
          </div>
        )
      })}
    </div>
  }
}

export default List;
