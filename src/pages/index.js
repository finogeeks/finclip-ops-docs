import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/*
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
        */}
        </div>
    </header>
  );
}

function BeiAnInfo() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
        <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAEkElEQVQ4jXWUbWwTBQBA312v1+u1XUvXrkyKcxsKW/iYATTgHIIfQMKHzkjAGEWDBDRIMBITwx+CMRATjGgAgxoF0RghIRmEMGBqkMWhBuJANsY2xrqxjX6wXnvX3vVa/0hiML7/7/18glXqA0CiDPCAeYGek608uHLjRL3v4oofT/72et4oyE88M+tAcObMY1ePfherW94Mci0wRuLasX/8/7IQ2PDVxi0rSkaPMphXcUwIoB/p+sTY3/JR45M1LcCXwPF/S+I9EaVt3xdtL68/syqTG1Ae8jpYp4yyQRlk/rwIwXkRad3608+17tnZArj+LxTNX9xx6uPD46xZV8PaaBr/Z1dIdNskem3Gl+1npd3J5oOrOXDUotT9+Q+Acm+o7ubxbb1NyzqbAlMivBnqpP9wGnFyAFszIV9ECAdo33SeVepFIo89zFPLTiy//csXfcBUADF7tRcpd8rb0u2TLwzPYekcjcylNOLNcYSAC1fSJnd+FGd1OUrGIP51B82LTdqu13PonF3pFbLuYPUriEC0+OvZ3UXBDZJOmTZMegSctgXJHEKtijw7gHgri0yReL/BpGAeBIFURsQVlnYD1eJA1+nnzaGhxgleGQouSpWVhBonkqGENr8ce00U7/YG1M0zEcMqFbNDZHUTSiUqK1SIXVqYHGx/TVS9E+rSmkVNOAdKOa0dKtKiMhLLq7CHNIQ/s+gnRrH67yBvbSS4ZRZHDqYADw0zJLK9Y+RivVGxmBxenk5JTI9qRB+R2XvIw887YzTMrcSv+tCvpCiO5cl1pvAN3eHyjmvsOegi0hBgxqRx4kN5rGRXoyhK2YCWFim7fY1Vi20Klhfr+Ajl3/+BOMmJGXZQrJAILaqksq2P+IHLZE0HzSuc+BI9aGkJySc6He+uXfmopAxNLaupIhrysO9sGePaGL58Am7EEdMFSt1JBAMGRD/fDEb43V/P3s0ZImGVglxErZj2rQRiRSldYrhXY3pdP++/M5ttW5s4rs2AtMUKPUEwIHLkhI8MKjCBt99QmDulh+EeIKdTLGizJClgzin4IlgjFrGxq7zV6KL5jIe2kzpd4kyW1F+n0h2n0DIJM2UweZrKe0tuMNp+A91SUEIyUkCeJuS0jhcTHbsOGyMm+bgFsQFqn23AFVHATmAnJDJjBv7qIFSVQyxO/7FuDF8Ib40X90QV/5Q1C4Sc1oFDcL2UvLz7Uztn+OPnRpA8JSYuqMNOGlh6FlFVUIIeBNlJor2Xgi3hn1OLlSPhn9q0WnaqZ6R8vAgYQ7kRt6FEiv7IoinY41lsLQ2qjEMOILvBvJMhG0uhVJWjRCPk7+jkhrSSe3IGkwxCpv9DgFaHY/RpQxfI9I0h2hZOFUxNRw74wdDIDowjet3I4TIQReSgF1dEBecDR4AXBCv9E4CaGj63y4z99apk6x414KKQNbE0C4ciUciaOIJlOBQHppFB9IRwhO6/Kaq1BxRP+AOgePeQOrApdTWy3Ri/vTRvDS64rz5cX9QErxIQg5Lbh3aLm+5wQJcqmi4le8fOGAOp1qrHKd790d/O3PzDty0xQQAAAABJRU5ErkJggg==" alt=""></img><div>粤公网安备 44030402004609号</div>
          <div>粤ICP备19148905号 凡泰极客</div>
          <div>© finogeeks.com</div>
        </div>

    </>
  )

}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
