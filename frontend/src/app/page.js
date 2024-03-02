import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-green">
      <div className="bg-white w-auto h-full flex flex-col items-center rounded-xl" style={{ boxShadow: '7px 8px 17px 0px #00000040' }}>
        <p className="font-bold text-6xl text-darkgray font-poppins text-center w-6/12 pt-14 ">Apa yang ingin anda baca hari ini?</p>
        <p className="font-inter text-lg text-lightgray font-semibold text-center w-1/2 p-10">Platform ini akan membantu andan untuk menemukan bahan bacaan yang sesuai dengan perasaan yang rasakan saat ini. Silakan memilih pilihan dibawah sehingga kami dapat lebih mengenal lebih jauh preferensi dan yang anda rasaka.</p>
        <div className="flex flex-row gap-96 pt-20">
          <button className="text-lg font-bold bg-limegreen text-white items-center justify-center p-4 rounded-lg">
            Face Recognition
          </button>
          <button className="text-lg font-bold bg-limegreen text-white items-center justify-center p-4 rounded-lg">
            Answer Question
          </button>
        </div>
      
      </div>

    </main>
  );
}
