import { SocialLinks } from './social-links'

export function Footer() {
  return (
    <footer className="border-t py-4 text-base text-center flex justify-between">
      <p className="font-bold">Douglas Moura</p>
      <SocialLinks />
    </footer>
  )
}
