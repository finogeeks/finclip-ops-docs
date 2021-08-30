import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '敏捷开发',
    Svg: require('../../static/img/undraw_Active_support_re_b7sj.svg').default,
    description: (
      <>
        利用小程序技术将业务功能碎片化，将APP化繁为简，实现敏捷迭代
      </>
    ),
  },
  {
    title: '多端引流',
    Svg: require('../../static/img/undraw_Online_posts_re_7ucl.svg').default,
    description: (
      <>
        FinClip小程序兼容主流小程序语法，实现一处开发，多处上架，打通社交平台连接
      </>
    ),
  },
  {
    title: '生态构建',
    Svg: require('../../static/img/undraw_Sync_re_492g.svg').default,
    description: (
      <>
        FinClip可让合作伙伴将自己的小程序入驻到自己的APP中，打造超级APP生态
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
