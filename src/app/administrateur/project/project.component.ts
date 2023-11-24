import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { fade } from 'src/app/Object/Animations';
import { Project } from 'src/app/Object/Project';
import { User } from 'src/app/Object/Users';
import { Task } from 'src/app/Object/task';
import { LoginService } from 'src/app/Services/login.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  animations: [fade]
})
export class ProjectComponent implements OnInit {

  constructor(private toastr: ToastrService, private l: LoadingBarService, private loginService: LoginService, private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getUser();
  }
  
  n: any = null;
  loader = this.l.useRef();
  // state
  active: boolean = true;
  projectModal: boolean = false;
  taskModal: boolean = false;
  onsend: boolean = false;
  getdata: boolean = true;
  // Data
  User!: User;
  Projects: Project[] = [];
  page: number = 1;

  // 
  SelectedP!: Project;
  //Project Forms variable
  projectName: string = "";
  description: string = "";
  repeats: boolean = false;

  Reset() {
    this.SelectedP = this.n;
    this.projectName = "";
    this.description = '';
    this.repeats = false;
  }

  // task forms
  search: string = "";
  task: string = "";
  dateS: Date = this.n;
  dateF: Date = this.n;
  SelectedT!: Task;

  ResetTask() {
    this.task = "";
    this.dateF = this.n;
    this.dateS = this.n;
    this.SelectedT = this.n;
    this.SelectedP = this.n;
  }

  // Save data start
  // Task part
  UpdateT(t: Task, p: Project) {
    this.SelectedP = p;
    this.SelectedT = t;
    this.task = t.tasks;
    if (t.datef) {
      this.dateF = t.datef;
    }
    if (t.dates) {
      this.dateS = t.dates;
    }
    this.taskModal = true;
  }

  SaveTask() {
    if (!this.onsend) {
      if (this.SelectedT) {
        this.UpdateTask();
      } else {
        this.NewTask();
      }
    } else {
      this.toastr.warning("Please wait...");
    }
  }

  NewTask() {
    if (!this.onsend) {
      if (!this.dateF) {
        this.dateF = this.n;
      }
      if (!this.dateS) {
        this.dateS = this.n;
      }
      let t = new Task(this.task, this.SelectedP, this.dateF, this.dateS);
      this.loader.start();
      this.onsend = true;
      this.service.newTask(t).subscribe(
        (res) => {
          this.SelectedP.idtask.push(res);
          this.loader.complete();
          this.toastr.success("Task saved successfully");
          this.taskModal = false;
          this.onsend = false;
          this.ResetTask();
          this.FIlterTask();
        },
        (err) => {
          this.loader.complete();
          this.onsend = false;
          if (this.active) {
            this.Error(err);
            this.toastr.warning("Server error");
          }
        }
      );
    }
  }

  UpdateTask() {
    if (!this.onsend) {
      this.SelectedT.tasks = this.task;
      this.SelectedT.dates = this.dateS;
      this.SelectedT.datef = this.dateF;
      this.loader.start();
      this.onsend = true;
      this.service.updateTask(this.SelectedT).subscribe(
        (res) => {
          this.onsend = false;
          this.loader.complete();
          this.SelectedT = res;
          this.toastr.success("Task updated successfully");
          this.ResetTask();
          this.taskModal = false;
          this.FIlterTask();
        },
        (err) => {
          this.loader.complete();
          this.onsend = false;
          if (this.active) {
            this.Error(err);
            this.toastr.warning("Server error");
          }
        }
      );
    }
  }

  DeleteTask(t: Task, i: number, p: Project) {
    if (!this.onsend) {
      this.SelectedP = p;
      if (confirm("Do you really want to delete this task ?")) {
        this.loader.start();
        this.onsend = true;
        this.service.DeleteTask(t).subscribe(
          (res) => {
            this.onsend = false;
            this.loader.complete();
            this.SelectedP.idtask.splice(i, 1);
            this.toastr.success("Task deleted successfully");
            this.ResetTask();
          },
          (err) => {
            this.loader.complete();
            this.onsend = false;
            if (this.active) {
              this.Error(err);
              this.toastr.warning("Server error");
            }
          }
        );
      }
    }
  }

  SetTaskDone(t: Task, p: Project) {
    if (!this.onsend) {
      this.SelectedP = p;
      this.onsend = true;
      this.loader.start();
      t.isdone = !t.isdone;
      this.service.SetTaskDone(t).subscribe(
        (res) => {
          this.toastr.success("Task state updated successfully");
          this.loader.complete();
          this.onsend = false;
          this.FIlterTask();
        },
        (err) => {
          this.loader.complete();
          this.onsend = false;
          if (this.active) {
            this.Error(err);
            this.toastr.warning("Server error");
          }
        }
      );
    }
  }

  // Project
  UpdateP(p: Project) {
    this.SelectedP = p;
    this.description = p.description;
    this.repeats = p.repeats;
    this.projectName = p.title;
    this.projectModal = true;
  }

  SaveProject() {
    if (!this.onsend) {
      if (this.SelectedP) {
        this.UpdateProject();
      } else {
        this.NewProject();
      }
    } else {
      this.toastr.warning("Please wait....")
    }
  }

  UpdateProject() {
    if (!this.onsend) {
      this.SelectedP.title = this.projectName;
      this.SelectedP.description = this.description;
      this.SelectedP.repeats = this.repeats;
      this.loader.start();
      this.onsend = true;
      this.service.updateProject(this.SelectedP).subscribe(
        (res) => {
          this.onsend = false;
          this.Projects = res;
          this.projectModal = false;
          this.loader.complete();
          this.toastr.success("Updated successfuly");
          this.Reset();
        },
        (err) => {
          this.loader.complete();
          this.onsend = false;
          if (this.active) {
            this.Error(err);
            this.toastr.warning("Server error");
          }
        }
      );
    }
  }

  NewProject() {
    if (!this.onsend) {
      let p = new Project(this.projectName, this.description);
      this.loader.start();
      this.service.newProject(p).subscribe(
        (res) => {
          this.Reset();
          this.projectModal = false;
          this.loader.complete();
          this.Projects = res;
          this.toastr.success("Project saved");
        },
        (err) => {
          this.loader.complete();
          this.onsend = false;
          if (this.active) {
            this.Error(err);
            this.toastr.warning("Server error");
          }
        }
      );
    }
  }

  DeleteProject(p: Project) {
    if (!this.onsend) {
      if (confirm("Do your really want to delete this project ?")) {
        this.loader.start();
        this.service.DeleteProject(p).subscribe(
          (res) => {
            this.Projects = this.Projects.filter((item) => { return item.idproject != p.idproject });
            this.loader.complete();
            this.toastr.success("Deleted successfully");
            this.Reset();
          },
          (err) => {
            this.loader.complete();
            this.onsend = false;
            if (this.active) {
              this.Error(err);
              this.toastr.warning("Server error");
            }
          }
        );
      }
    }
  }

  // Project task filter
  FIlterTask() {
    this.Projects.forEach((item) => {
      item.idtask.sort((a, b) => {
        if (a.datef && b.datef) {
          if (a.datef < b.datef) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.isdone && b.isdone) {
            if (a.idtask! < b.idtask!) {
              return -1;
            } else {
              return 1;
            }
          } else {
            if (a.isdone && !b.isdone) {
              return 1
            } else {
              return -1;
            }
          }
        }
      });
    });
  }


  // Get Data function start

  getUser() {
    let u = this.loginService.User;
    this.loader.start();
    if (u) {
      this.User = u;
      this.loader.complete();
      this.getProject();
    } else {
      this.loginService.getuser().subscribe(
        (res) => {
          this.User = res;
          this.loader.complete();
          this.getProject();
        },
        (err) => {
          this.loader.complete();
          if (this.active) {
            this.getUser();
            this.Error(err);
          }
        }
      );
    }
  }

  getProject() {
    let p = this.service.Projects;
    this.loader.start();
    if (p.length != 0) {
      this.Projects = p;
      this.loader.complete();
      this.getdata = false;
      this.FIlterTask();
    } else {
      this.service.getProjectList(this.User).subscribe(
        (res) => {
          this.Projects = res;
          this.loader.complete();
          this.getdata = false;
          this.FIlterTask();
        },
        (err) => {
          this.loader.complete();
          if (this.active) {
            this.getProject();
            this.Error(err);
          }
        }
      );
    }
  }

  Error(error: any) {
    this.loader.complete();
    if (error.error['message'] != "Expired JWT Token") {
      console.log(error.error);
      this.toastr.warning("Server error");
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
