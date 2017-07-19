import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item : []
    }
  }

  accordionItem = (itemID) => {
    this.props.accordionItem(itemID);
  }

  removeItem = (itemID) => {
    this.props.removeItem(itemID);
  }

  render() {
      return (
          <div className={this.props.item.showChilds===true || this.props.item.showChilds===undefined ? "show-childs" : "hide-childs"}>

            <div className={"table-row depth-" + this.props.depth}>
              <div className="table-col">{this.props.item.ID}</div>
              <div className="table-col">{this.props.item.Name}</div>
              <div className="table-col">{this.props.item.City}</div>
              <div className="table-col">{this.props.item.Phone}</div>
              <div className="table-col">
                <button onClick={(e) => this.removeItem(this.props.item.ID)}>
                  <i className="icon-trash"></i>
                </button>
              </div>
              <button className={this.props.item.children.length===0 ? 'expand-arrow hidden' : 'expand-arrow'} onClick={(e) => this.accordionItem(this.props.item.ID)}>
                <i className={this.props.item.showChilds===true || this.props.item.showChilds===undefined ? 'icon-down-open' : 'icon-up-open'} ></i>
              </button>
            </div>

            {this.props.item.children.map(item =>
                <Row key={item.ID} item={item} removeItem={this.removeItem} accordionItem={this.accordionItem} depth={this.props.depth + 1}/>
            )}
          </div>
      )
  }
}

export default Row;
