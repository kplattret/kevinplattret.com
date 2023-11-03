import Layout from '../components/Layout'
import Link from 'next/link'

const title = 'Work'

export default function Work() {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <h2>Deliveroo</h2>

      <p>During my three and a half years at Deliveroo, I worked on a wide range of challenges
        across several different teams. Most of those revolved around improving the user experience
        for customers, riders, restaurants and internal teams alike.</p>

      <p>The first large project I worked on after joining, was creating the administration
        dashboard for <a href="https://deliveroo.co.uk/business">Deliveroo for Business</a>. It
        allows corporate customers to manage their account, from employee allowance groups to large
        group orders, including monthly billing.</p>

      <p>Later, I spent a couple of years focusing on making the delivery network more resilient. My
        team and I built a real-time monitoring system, which we designed to automatically detect
        anomalies across all live orders on the network. We then implemented a set of actions that
        would trigger whenever an issue occurred, to try and fix it, otherwise surfacing it up onto
        a dashboard for operation teams to investigate further. This system was later integrated
        into the internal customer service tools.</p>

      <p>In my final year at the company, I joined the Rider Payments team where we implemented a
        feature to allow riders to get paid when they want and as quickly as possible. We also built
        the foundations for a rewards system, to help the business incentivise and recognise riders
        for their loyalty.</p>

      <h2>3beards</h2>

      <p>When I joined the <a href="https://3beards.github.io">3beards</a> in 2013, I knew I was in
        for something different, but I certainly didn&apos;t expect the tremendous adventure it
        turned out to be. One I could never forget in a lifetime.</p>

      <p>3beards was many great things and one of them was our online platform, where the startup
        community could get updates on our various events, find office space or even hire talent.
        During my time at the company, I was in charge of building and maintaining our applications,
        as well as managing our technical partnerships.</p>

      <p>As a natural extension of our offline gatherings and events, we later
        built <a href="https://unicornhunt.io">Unicorn Hunt</a>, which we launched in January 2015.
        A job board for startups and our answer to the ever increasing need for talent. Unicorn Hunt
        was acquired by Tiny Capital in late 2017.</p>

      <p>I spent <Link href="/thoughts/my-1000-days-at-3beards">1000 days at 3beards</Link> and they
        were all quite special.</p>

      <h2>Top Left Design</h2>

      <p>Every career starts somewhere and mine did
        at <a href="https://topleftdesign.com">Top Left Design</a>, a web design studio based in the
        heart of Soho in London, UK.</p>

      <p>As an intern first and then as one of the very first in-house web developers, I worked
        alongside a team of talented designers to create bespoke websites for a large variety of
        clients.</p>

      <p>There I learned about the WordPress content management system in great depth, and how to
        translate a business need into an elegant and ergonomic solution. I also gained more
        experience in project management and discovered new design concepts along the way.</p>
    </Layout>
  )
}
