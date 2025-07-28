import MagicBento from "@/components/sub/feature";

export default function Features(){
    return(
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Susbot's features.
            </h2>
            <div className="h-5"></div>
            <MagicBento/>
        </div>
    )
}