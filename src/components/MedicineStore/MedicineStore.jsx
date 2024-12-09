// import style from './MedicineStore.module.css';

// import { useDispatch, useSelector } from 'react-redux';

// import { fetchStores } from '../../redux/stores/operation';
// import { selectStores, selectLoading } from '../../redux/stores/selectors';
// import { useEffect } from 'react';


// function MedicineStore() {

//   const dispatch = useDispatch();
//   const loading = useSelector(selectLoading);
//   const stores = useSelector(selectStores);

//   useEffect(() => {
//     if (stores.length === 0 && !loading) {
//       dispatch(fetchStores()); 
//     }
//   }, [dispatch, stores.length, loading]);

//   return (
//     <section className={style.sectionStore}>
//       <h2 className={style.titleStore}>Medicine store</h2>
//       {loading ? (
//         <p>Loading stores...</p> 
//       ) : error ? (
//         <p>{error}</p> 
//       ) : stores.length > 0 ? (
//         <div className={style.storeList}>
//           {stores.map((store) => (
//             <div key={store.name} className={style.storeItem}>
//               <h3>{store.name}</h3>
//               <p>{store.address}</p>
//               <p>{store.city}</p>
//               <p>{store.phone}</p>
//               <p>Rating: {store.rating}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No stores found.</p>
//       )}
//     </section>
//   )
// };

// export default MedicineStore;
