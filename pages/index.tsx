import Layout from 'components/Layout'

import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className="highlight">
        <p>Hello! I&apos;m Kevin, a software engineer who loves solving problems with code and
          building products that make the Internet a better place for everyone. I&apos;m always
          learning something new.</p>
      </div>

      <p>Most recently, I worked across several teams
        at <Link href="/work">Deliveroo</Link> since 2016, focusing primarily on making the delivery
        network more resilient and helping riders get paid as quickly as possible.</p>

      <p>When I&apos;m not writing <a href="https://github.com/kplattret">code</a>, I have quite a
        few activities that fight for my attention. Among other things I enjoy reading books,
        exploring the outdoors on my bike or on foot, playing video-games,
        taking <a href="https://instagram.com/kplattret">pictures</a>, cooking and playing the
        violin.</p>
    </Layout>
  )
}
