/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import React from 'react';
import '../../node_modules/rc-tree/assets/index.less';
import Tree, { TreeNode } from 'rc-tree';
import type { TreeProps} from 'rc-tree';
import type {Key} from 'rc-tree/lib/interface'
import type {Ref} from 'react'

interface DemoProp {
  keys: Key[];
}

interface DemoState {
  defaultExpandedKeys: Key[];
  defaultSelectedKeys: Key[],
  defaultCheckedKeys: Key[],

}

class Demo extends React.Component<DemoProp, DemoState> {
  static defaultProps = {
    keys: ['0-0-0-0'],
  };
  /* 
  The defaultProps is a React component property that allows you to set default values for the props argument. 
  If the prop property is passed, it will be changed. 
  The defaultProps can be defined as a property on the component class itself, to set the default props for the class. 
  */
  treeRef: Ref<Tree>

  selKey: Key | null = null
  

  constructor(props: DemoProp) {
    super(props);
    const {keys} = props;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };

    this.treeRef = React.createRef<Tree>();
  }

  onExpand: (keys: Key[]) => void = expandedKeys => {
    console.log('onExpand', expandedKeys);
  };

  onSelect: (selectedKeys: Key[], info: any) => void = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };


  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  render() {
    const customLabel = (
      <span className="cus-label">
        <span>operations: </span>
        <span style={{ color: 'blue' }} onClick={this.onEdit}>
          Edit
        </span>
        &nbsp;
        <label onClick={e => e.stopPropagation()}>
          <input type="checkbox" /> checked
        </label>
        &nbsp;
      </span>
    );

    return (
      <div style={{ margin: '0 20px' }}>
        <Tree
          className="myCls"
          showLine
          checkable
          defaultExpandAll
          defaultExpandedKeys={this.state.defaultExpandedKeys}
          onExpand={this.onExpand}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect}
          onActiveChange={key => console.log('Active:', key)}
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title={customLabel} key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" style={{ background: 'rgba(255, 0, 0, 0.1)' }} />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="parent 1-1-0" key="0-0-1-0" disableCheckbox />
              <TreeNode title="parent 1-1-1" key="0-0-1-1" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2" disabled>
              <TreeNode title="parent 1-2-0" key="0-0-2-0" checkable={false} />
              <TreeNode title="parent 1-2-1" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

export default Demo;