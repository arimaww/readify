import styles from './SortPanel.module.scss'
import rusFlag from '../../assets/ru.png'
import engFlag from '../../assets/eng.png'
import gerFlag from '../../assets/ger.png'
import azerFlag from '../../assets/azer.png'
import Select, { SingleValue } from 'react-select'
import {  ChangeEvent } from 'react'

export type TOptions = {
    label: string | undefined,
    value: boolean | undefined
}
const options:TOptions[] = [
    { value: true, label: 'Более популярные' },
    { value: false, label: 'Менее популярные' },
];
export type TSortData = {
    withSubscription: boolean | null,
    format: "All" | "Text" | "Audio" | null,
    language: {0?: "RUSSIAN", 1?: "ENGLISH", 2?: "DUTCH", 3?: "AZERBAIJANIAN"} | null,
    highEstimation: boolean | null,
    discount: boolean | null
  }

type TSortPanel = {
    selectedOption: TOptions | undefined,
    setSelectedOption: React.Dispatch<React.SetStateAction<TOptions | undefined>>,
    sortData: TSortData,
    setSortData: React.Dispatch<React.SetStateAction<TSortData>>
}
const SortPanel = ({selectedOption, setSelectedOption, sortData, setSortData}:TSortPanel) => {

    return (
        <div className={styles.sortPanel}>
            <div className={styles.sortPanel__with_subsciption}>
                <div className={styles.sortPanel__inputItem}>
                    <label htmlFor="subscription">Доступно по подписке</label>
                    <input type="checkbox" id="subscription" onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, withSubscription: event.target.checked})} />
                </div>
            </div>

            <div className={styles.popular}>
                <h3>Популярность</h3>
                <Select defaultValue={selectedOption} onChange={(event: SingleValue<TOptions | undefined>) => setSelectedOption({value: event?.value, label: event?.label})} options={options} />

            </div>

            <div className={styles.sortPanel__format}>
                <h3>Формат</h3>

                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='all' name='format' onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, format: event?.currentTarget.checked ? "All" : null})}/>
                    <label htmlFor="all">Все</label>
                </div>
                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='text' name='format' onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, format: event?.currentTarget.checked ? "Text" : null})}/>
                    <label htmlFor="text">Текст</label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='audio' name='format' onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, format: event?.currentTarget.checked ? "Audio" : null})}/>
                    <label htmlFor="audio">Аудио</label>
                </div>
            </div>

            <div className={styles.sortPanel__languages}>
                <h3>Язык</h3>
                <div className={styles.sortPanel__inputItem}>
                    <input type="checkbox" id='russian' onChange={() => setSortData({...sortData, language: {...sortData.language, 0: "RUSSIAN"}})}
                    />
                    <label htmlFor="russian">
                        <span>Русский</span>
                        <img src={rusFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input type="checkbox" id='english' onChange={() => setSortData({...sortData, language: {...sortData.language, 1: "ENGLISH"}})}
                    />
                    <label htmlFor="english"><span>Английский</span>
                        <img src={engFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input type="checkbox" id='dutch' onChange={() => setSortData({...sortData, language: {...sortData.language, 2: "DUTCH"}})}
                    />
                    <label htmlFor="dutch"><span>Немецкий</span>
                        <img src={gerFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input type="checkbox" id='azerbaijanian' onChange={() => setSortData({...sortData, language: {...sortData.language, 3: "AZERBAIJANIAN"}})}
                    />
                    <label htmlFor="azerbaijanian"><span>Азербайджанский</span>
                        <img src={azerFlag} alt="" />
                    </label>
                </div>

            </div>

            <div className={styles.sortPanel__highEstimation}>
                <div className={styles.sortPanel__inputItem}>
                    <label htmlFor='estimation'>Высокая оценка</label>
                    <input type="checkbox" id='estimation' onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, highEstimation: event.currentTarget.checked})}/>
                </div>
            </div>

            <div className={styles.sortPanel__discount}>
                <div className={styles.sortPanel__inputItem}>
                    <label htmlFor="discount">Со скидкой по акции</label>
                    <input type="checkbox" id="discount" onChange={(event:ChangeEvent<HTMLInputElement>) => setSortData({...sortData, discount: event.currentTarget.checked})}/>
                </div>
            </div>
        </div>
    )
}

export default SortPanel