import ShareIcon from 'react-icons/lib/fa/share-square'

export default {
  name: 'socialProfiles',
  title: 'Social Profiles',
  type: 'document',
  icon: ShareIcon,
  fields: [
    {
      name: 'site',
      title: 'Site Name',
      type: 'string'
    },
    {
      name: 'url',
      title: 'Profile URL',
      type: 'url'
    },
    {
      name: 'icon',
      title: 'Social Icon',
      type: "image"
    }
  ],
  liveEdit: true
}
