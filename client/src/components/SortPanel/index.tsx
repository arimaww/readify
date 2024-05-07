import styles from './SortPanel.module.scss'
import rusFlag from '../../assets/ru.png'
import engFlag from '../../assets/eng.png'
import gerFlag from '../../assets/ger.png'
import azerFlag from '../../assets/azer.png'
import Select, { SingleValue } from 'react-select'
import { ChangeEvent, useRef } from 'react'

export type TOptions = {
    label: string | undefined,
    value: boolean | undefined
}
const options: TOptions[] = [
    { value: true, label: 'Более популярные' },
    { value: false, label: 'Менее популярные' },
];
export type TSortData = {
    withSubscription: boolean | null,
    format: "All" | "Text" | "Audio" | null,
    language: string[] | null,
    highEstimation: boolean | null,
    discount: boolean | null,
}

type TSortPanel = {
    selectedOption: TOptions | undefined,
    setSelectedOption: React.Dispatch<React.SetStateAction<TOptions | undefined>>,
    sortData: TSortData,
    setSortData: React.Dispatch<React.SetStateAction<TSortData>>
}
const SortPanel = ({ selectedOption, setSelectedOption, sortData, setSortData }: TSortPanel) => {
    const selectRef = useRef<any>(null);
    const formatRef = useRef<any>(null);
    // const withSubscription = useRef<any>(null);
    const withDiscount = useRef<any>(null);
    const [rusLang, engLang, gerLang, azerLang] = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];

    const resetInputsAndSelect = () => {
        if (selectRef.current && withDiscount.current
            && rusLang.current && engLang.current && gerLang.current && azerLang.current && formatRef.current
        ) {
            selectRef.current.setValue(null);
            // withSubscription.current.checked = false;
            formatRef.current.checked = true;
            withDiscount.current.checked = false;
            [rusLang, engLang, gerLang, azerLang].forEach(ref => {
                if (ref.current) {
                    ref.current.checked = false;
                }
            });
        }
    };
    const handleResetFilters = () => {
        resetInputsAndSelect();
        setSortData({ discount: null, format: "All", highEstimation: null, language: [], withSubscription: null })
    }

    return (
        <div className={styles.sortPanel}>
            {/* <div className={styles.sortPanel__with_subsciption}>
                <div className={styles.sortPanel__inputItem}>
                    <label htmlFor="subscription">Доступно по подписке</label>
                    <input ref={withSubscription} type="checkbox" id="subscription" onChange={(event: ChangeEvent<HTMLInputElement>) => setSortData({ ...sortData, withSubscription: event.target.checked })} />
                </div>
            </div> Подписки пока нет*/}

            <div className={styles.popular}>
                <h3>Популярность</h3>
                <Select ref={selectRef} defaultValue={selectedOption} onChange={(event: SingleValue<TOptions | undefined>) => {
                    setSelectedOption({ value: event?.value, label: event?.label })
                    setSortData({ ...sortData, highEstimation: event?.value! })
                }} options={options} />

            </div>

            <div className={styles.sortPanel__format}>
                <h3>Формат</h3>

                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='all' name='format' ref={formatRef} onChange={() => setSortData({ ...sortData, format: "All" })} />
                    <label htmlFor="all">Все</label>
                </div>
                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='text' name='format' onChange={() => setSortData({ ...sortData, format: "Text" })} />
                    <label htmlFor="text">Текст</label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input type="radio" id='audio' name='format' onChange={() => setSortData({ ...sortData, format: "Audio" })} />
                    <label htmlFor="audio">Аудио</label>
                </div>
            </div>

            <div className={styles.sortPanel__languages}>
                <h3>Язык</h3>
                <div className={styles.sortPanel__inputItem}>
                    <input ref={rusLang} type="checkbox" id='russian' onChange={() => {

                        if (sortData.language?.includes("RUSSIAN")) {
                            setSortData({ ...sortData, language: sortData.language.filter(el => el !== "RUSSIAN").length > 0 ? sortData.language.filter(el => el !== "RUSSIAN") : null })
                        }
                        else {
                            setSortData({ ...sortData, language: [...(sortData.language || []), "RUSSIAN"] });
                        }
                    }}
                    />
                    <label htmlFor="russian">
                        <span>Русский</span>
                        <img src={rusFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input ref={engLang} type="checkbox" id='english' onChange={() => {
                        if (sortData.language?.includes("ENGLISH")) {
                            setSortData({ ...sortData, language: sortData.language.filter(el => el !== "ENGLISH").length > 0 ? sortData.language.filter(el => el !== "ENGLISH") : null })
                        }
                        else {
                            setSortData({ ...sortData, language: [...(sortData.language || []), "ENGLISH"] });
                        }

                    }}
                    />
                    <label htmlFor="english"><span>Английский</span>
                        <img src={engFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input ref={gerLang} type="checkbox" id='dutch' onChange={() => {
                        if (sortData.language?.includes("GERMANY")) {
                            setSortData({ ...sortData, language: sortData.language.filter(el => el !== "GERMANY").length > 0 ? sortData.language.filter(el => el !== "GERMANY") : null })
                        }
                        else {
                            setSortData({ ...sortData, language: [...(sortData.language || []), "GERMANY"]});
                        }
                    }}
                    />
                    <label htmlFor="dutch"><span>Немецкий</span>
                        <img src={gerFlag} alt="" />
                    </label>
                </div>

                <div className={styles.sortPanel__inputItem}>
                    <input ref={azerLang} type="checkbox" id='azerbaijanian' onChange={() => {
                        if (sortData.language?.includes("AZERBAIJANIAN")) {
                            setSortData({ ...sortData, language: sortData.language.filter(el => el !== "AZERBAIJANIAN").length > 0 ? sortData.language.filter(el => el !== "AZERBAIJANIAN") : null })
                        }
                        else {
                            setSortData({ ...sortData, language: [...(sortData.language || []), "AZERBAIJANIAN"] });
                        }
                    }}
                    />
                    <label htmlFor="azerbaijanian"><span>Азербайджанский</span>
                        <img src={azerFlag} alt="" />
                    </label>
                </div>

            </div>

            <div className={styles.sortPanel__discount}>
                <div className={styles.sortPanel__inputItem}>
                    <label htmlFor="discount">Со скидкой по акции</label>
                    <input ref={withDiscount} type="checkbox" id="discount" onChange={(event: ChangeEvent<HTMLInputElement>) => setSortData({ ...sortData, discount: event.currentTarget.checked })} />
                </div>
            </div>
            <button onClick={handleResetFilters}>Сбросить фильтры</button>
        </div>
    )
}

export default SortPanel