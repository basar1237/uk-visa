import type {Block} from 'payload'

export const LongGrids: Block ={

     slug:'longGrids',
     interfaceName:'LongGridsBlock',
     fields :[
          {
               name:'title',
               type:'text',
               label:'Section Title',
               required:false,
          },
          {
               name:'description',
               type:'textarea',
               label:'Section Description',
               required:false,
          },
          {
               name:'gridItems',
               type:'array',
               label:'Grid Items',
               minRows:1,
               maxRows:10,
               fields:[
                    {
                         name:'title',
                         type:'text',
                         label:'Title',
                         required:true,

                    },
                    {
                         name:'description',
                         type:'textarea',
                         label:'Description',
                         required:true,
                    },
                    {
                         name:'item',
                         type:'text',
                         label: 'Price/Subtitle (e.g. "From - £199")',
                         required:false,
                    },
                    {
                      name : 'link',
                      type:'group',
                      label:'Link',
                      fields:[
                        {
                         name:'url',
                         type:'text',
                         label:'Link URL',
                         required:false,
                        },
                        {
                         name:'label',
                         type:'text',
                         label:'Button Text',
                         defaultValue:'Learn More',
                         required:false,
                        },
                      ]
                    },
               ]
          }
     ]
}