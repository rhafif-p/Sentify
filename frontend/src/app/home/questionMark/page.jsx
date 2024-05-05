export default function questionMark(){
    const numbers = Array.from({length: 10}, (_, i) => i + 1);
    const dummy=["Negeri 5 Menara","Ikigai","Dune part 2","The amazin Spidemerna","Superman Puch", "Santino Marela","The undertaker","Ninjago The Movie"];
    return (
        <main className="flex h-full flex-col items-center justify-between p-10 bg-green">
            <div
                className="bg-white h-auto flex flex-col items-start  rounded-xl m-8 p-20 "
                style={{ boxShadow: '7px 8px 17px 0px #00000040' }}
            >
                <p className="font-bold text-6xl text-darkgray font-poppins text-start w-4/6  pb-8 leading-tight ">
                    Jawab pertanyaan di bawah dengan seksama
                </p>
                <p className="w-2/3 font-inter text-lg text-lightgray font-semibold text-start px-2">
                    Kami akan mencoba memahami anda sebaik mungkin
                </p>

                <div className="justify-start pt-10">
                    <div className="flex flex-row">
                        <div className="min-h-max flex flex-col min-w-[24px] justify-between items-center relative pt-2 pr-8">
                            <img
                            src="/question-bullet.svg"
                            alt="question-bullet"
                            width={20}
                            className="w-[20px] absolute"
                            />
                            <div className="bg-lightgray min-h-[100%] w-[3px] rounded-full mt-[19px]"></div>
                        </div>
                        <div>
                            <div className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg w-1/3">
                                Pertanyaan 1
                            </div>
                            <p className="font-inter text-lg text-lightgray font-semibold text-start px-2 pt-6">
                                Bagaimana anda mendeksripsikan buku-buku tere liye dalam skala berikut
                            </p>
                            <div className="justify-start flex flex-wrap gap-9 pt-5 pb-20">
                                {numbers.map(number => (
                                    <button
                                        key={number}
                                        className="text-lg font-bold text-lightgray flex items-center justify-center p-2 w-9 h-9 rounded-full hover:text-white hover:bg-limegreen"
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="min-h-max flex flex-col min-w-[24px] justify-between items-center relative pt-2 pr-8">
                            <img
                            src="/question-bullet.svg"
                            alt="question-bullet"
                            width={20}
                            className="w-[20px] absolute"
                            />
                            <div className="bg-lightgray min-h-[100%] w-[3px] rounded-full mt-[19px]"></div>
                        </div>
                        <div>
                            <div className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg w-1/3">
                                Pertanyaan 2
                            </div>
                            <p className="font-inter text-lg text-lightgray font-semibold text-start px-2 pt-6">
                                Pilihlah judul buku berikut yang menurut anda paling menggambarkan anda                            </p>
                            <div className="justify-start flex flex-wrap gap-9 pt-5 pb-20">
                                {dummy.map(number => (
                                    <button
                                        key={number}
                                        className="items-center text-lightgray p-4 justify-center rounded-lg border-4 border-solid border-limegreen hover:bg-limegreen hover:text-white"
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="min-h-max flex flex-col min-w-[24px] justify-between items-center relative pt-2 pr-8">
                            <img
                            src="/question-bullet.svg"
                            alt="question-bullet"
                            width={20}
                            className="w-[20px] absolute"
                            />
                            <div className="bg-lightgray min-h-[100%] w-[3px] rounded-full mt-[19px]"></div>
                        </div>
                        <div>
                            <div className="text-lg font-bold bg-limegreen text-white flex items-center justify-center p-4 rounded-lg w-1/3">
                                Pertanyaan 3
                            </div>
                            <p className="font-inter text-lg text-lightgray font-semibold text-start px-2 pt-6 pb-4">
                            Deskripsikan genre apa yang paling anda inginkan untuk baca, anda dapat menjelaskan tentang alur cerita, latar, serta apapun yang ebrsangkutan dengan buku tersebut                            
                            </p>
                            <div className="justify-start rounded-lg border-4 border-limegreen">
                                <input
                                type="text"
                                placeholder="Tuliskan Deskripsi disini..."
                                className="text-lightgray p-3 w-auto h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}