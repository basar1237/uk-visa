import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlockComponent } from '@/blocks/FAQBlock/Component'
import { FeaturesGridComponent } from '@/blocks/FeaturesGrid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { LandingBlock } from '@/blocks/Landing/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ServicesGridComponent } from '@/blocks/ServicesGrid/Component'
import { LongGridsBlock } from '@/blocks/LongGrids/Components'
import { StatsBoxesBlockComponent } from '@/blocks/StatsBoxesBlock/Component'
import { TestimonialsBlockComponent } from '@/blocks/TestimonialsBlock/Component'
import { KnowledgeBaseComponent } from '@/blocks/KnowledgeBase/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlockComponent,
  featuresGrid: FeaturesGridComponent,
  formBlock: FormBlock,
  knowledgeBase: KnowledgeBaseComponent,
  landingBlock: LandingBlock,
  mediaBlock: MediaBlock,
  longGrids: LongGridsBlock,
  servicesGrid: ServicesGridComponent,
  statsBoxesBlock: StatsBoxesBlockComponent,
  testimonialsBlock: TestimonialsBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          // isActive field'ını kontrol et - eğer false ise bloğu render etme
          if (block && 'isActive' in block && block.isActive === false) {
            return null
          }

          if (blockType && blockType in blockComponents) {
            // LongGrid'i gizle
            if (blockType === 'longGrids') {
              return null
            }

            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-5" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
