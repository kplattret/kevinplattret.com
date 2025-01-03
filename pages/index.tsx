import Link from 'next/link'

import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="highlight">
        <p>Hello! I&apos;m Kevin, a software engineer who loves solving problems with code and
          building products that make the Internet a better place for everyone. I&apos;m always
          learning something new.</p>
      </div>

      <p>Currently, I work at <Link href="/work">TrueLayer</Link>, changing the way the world pays
        for the better. I lead the Payments Risk team, focusing primarily on enabling instant and
        compliant open-banking payments.</p>

      <p>When I&apos;m not writing <a href="https://github.com/kplattret">code</a>, I have quite a
        few activities that fight for my attention. Among other things I enjoy reading books,
        exploring the outdoors on my bike or on foot, playing video-games,
        taking <a href="https://instagram.com/kplattret">pictures</a>, cooking and playing the
        violin.</p>
    </Layout>
  )
}
