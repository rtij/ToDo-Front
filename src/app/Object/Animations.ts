import { animate, state, style, transition, trigger } from "@angular/animations";

export let fade = trigger('fade',[
    state('void',style({opacity:0})),
    transition('void=> *',[
      animate(1200, style({opacity :1}))
    ]),
    transition('*=>void',[
      animate(500, style({opacity :0}))
    ]),
  ]);

  export let translate = trigger('translate',[
    state('void',style({opacity:0,transform: 'translateX(100%)'})),
    transition('void=>*',[
      animate(500,style({opacity:1,transform: 'translateX(0)'}))
    ]),
    transition('*=>void',[
      animate(500,style({opacity:0,transform: 'translateX(100%)'}))
    ])
  ]);

  export let animatezoom = trigger('animatezoom',[
    state('void',style({transform: 'scale(0)'})),
    transition('void=>*',[
      animate(600,style({transform: 'scale(1)'}))
    ]),
    transition('*=>void',[
      animate(600,style({transform: 'scale(0)'}))
    ])
  ]);