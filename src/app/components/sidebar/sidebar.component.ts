import { Component, OnInit } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TreeModule, CommonModule, DropdownModule,RouterLink,ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit{
  userRole!: string | null;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('roleId');
    console.log("User Role",this.userRole);
  }
  loading:boolean = false;

  constructor(private router: Router,private loginService:LoginService){}
  phoneInfoNode: TreeNode[] = [
    {
      label: 'ข้อมูลเลขหมาย',
      children: [{ label: 'ค้นหาเลขหมาย' , data:'phone' }],
      expanded: false,
    },
  ];
  blockNode: TreeNode[] = [
    {
      label: 'Block',
      children: [{ label: 'หน้าแรก' , data:'block' }, { label: 'Block' , data:'blockSearch' }],
      expanded: false,
    },
  ];
  assignNode: TreeNode[] = [
    {
      label: 'Assigned',
      children: [{ label: 'หน้าแรก' , data:'assign'}, { label: 'ค้นหา Assigned' , data:'assignSearch' }],
    },
  ];
  reportNode: TreeNode[] = [
    {
      label: 'Report & Data',
      children: [
        { label: 'Report' , data:'report'},
        { label: 'Data' , data:'data' },
        { label: 'รายงาน กสทช.' },
      ],
    },
  ];
  expandNode(node: any) {
    node.expanded = !node.expanded;
    console.log(node.expanded);
  }
  onNodeSelect(event : any) {
    console.log(event.node.data);
    if(event.node.data === 'phone'){
      this.router.navigateByUrl('/phone');
    }else if(event.node.data === 'block'){
      this.router.navigateByUrl('/block');
    }else if(event.node.data === 'blockSearch'){
      this.router.navigateByUrl('/block/search');
    }else if(event.node.data === 'assign'){
      this.router.navigateByUrl('/assign');
    }else if(event.node.data === 'assignSearch'){
      this.router.navigateByUrl('/assign/search');
    }else if(event.node.data === 'report'){
      this.router.navigateByUrl('/report');
    }else if(event.node.data === 'data'){
      this.router.navigateByUrl('/data');
    }  
  }

  signOut(){
    this.loading = true;

    let data = {
      "clientKey":"bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0",
      "token":localStorage.getItem('token')
    }

    this.loginService.signOut(data).subscribe(
      (response:any)=>{
        console.log(response);
        this.loading = false;
        localStorage.removeItem('token');
        window.location.reload();
      },
      (error)=>{
        console.log(error.message);
        this.loading = false;
      }
    );
  }
}
