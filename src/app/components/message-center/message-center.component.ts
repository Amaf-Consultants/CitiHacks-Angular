import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Messages',
    children: [
      {name: 'Inbox'},
      {name: 'Read & Queu'},
      {name: 'Rejected'},
      {name: 'Duplicate'},
      {name: 'Answered'}
    ]
  }];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}



@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.css']
})

export class MessageCenterComponent implements OnInit {


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

      constructor() {
        this.dataSource.data = TREE_DATA;
      }

  ngOnInit() {
  }





  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


