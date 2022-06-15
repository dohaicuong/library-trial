import { Skeleton } from '@mantine/core'
import { useAtom } from 'jotai'
import { Stack } from 'tabler-icons-react'
import { portalAtom } from './portalAtom'
import PortalListItem from './PortalListItem'

export const PortalList = () => {
  const [{ pages }] = useAtom(portalAtom)

  return (
    <>
      {pages[0].map((portal: any) => {
        return (
          <PortalListItem
            key={portal.instance_name}
            name={portal.instance.configuration.site_name}
            url={portal.instance_name}
            logo={portal?.instance?.files?.logo}
          />
        )
      })}
    </>
  )
}

export const PortalSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
    </Stack>
  )
}
