import style from './PromoBanners.module.css';

function PromoBanners() {
  return (
    <section className={style.sectionBanners}>
        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>1</div>
                <h3 className={style.bannersTitle}>Huge Sale</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>70 &#37;</p>
                <button type='submit'className={style.bannersBtn}>Shop now</button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>2</div>
                <h3 className={style.bannersTitle}>Secure delivery</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>100 &#37;</p>
                <button type='submit'className={style.bannersBtn}>Read more</button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>3</div>
                <h3 className={style.bannersTitle}>Off</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>35 &#37;</p>
                <button type='submit'className={style.bannersBtn}>Shop now</button>
            </div>
        </div>

        <h2 className={style.titleStore}>Your Nearest Medicine Store</h2>
        <p className={style.textStore}>Search for Medicine, Filter by your location</p>
    </section>
  )
};

export default PromoBanners;
