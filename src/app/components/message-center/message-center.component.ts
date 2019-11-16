import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { CommunicationService } from '../service/communication.service';
import { Subscriber } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

interface MessageNode {
  name: string;
  children?: MessageNode[];
}

const TREE_DATA: MessageNode[] = [
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

  constructor(private communicationService: CommunicationService) {
    this.dataSource.data = TREE_DATA;
  }

  private _transformer = (node: MessageNode, level: number) => {
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

      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)


  ngOnInit() {
 // this.getData();
  }







  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


