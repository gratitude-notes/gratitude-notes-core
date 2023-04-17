import { AbsoluteFill, Sequence, staticFile, Audio } from "remotion";
import { HelloUserIntro } from "./HelloUserIntro/HelloUserIntro";
import { useSession } from "../../../lib/Session";
import useUserBullets from "../../../hooks/useUserBullets";
import { CurrentWeekIntro } from "./CurrentWeekIntro/CurrentWeekIntro";
import { NumberNotesContent } from "./NumberNotesContent/NumberNotesContent";
import useProfileData from "../../../hooks/useProfileData";
import { ShowStreakContent } from "./ShowStreakContent/ShowStreakContent"
import { StreakFall } from "./StreakFall";
import DotsDurationOfSequence from "./NumberNotesContent/Effects/DotsDurationOfSequence";
import background_music from "../../../assets/weekly_dosage/audio/background_music.mp3";

type WeeklyDosageVideoProps = {
}

export const WeeklyDosageVideo: React.FC<WeeklyDosageVideoProps> = ({  }) => {
    const session = useSession();
    const pastWeekBullets = useUserBullets("PastWeek");
    const lifetimeBullets = useUserBullets("Personal");
    const profData = useProfileData();

    return (
        <div className="bg-white text-black h-full w-full">
            <AbsoluteFill>
                {/* Starts at 0 seconds, 4 seconds long */}
                <Sequence from={0} durationInFrames={4 * 30}>
                    <HelloUserIntro displayName={session?.user?.displayName}/>

                    {/* <Confetti /> */}
                </Sequence>

                {/* Starts at 4 seconds, 5 seconds long */}
                <Sequence from={4 * 30} durationInFrames={5 * 30}>
                    <CurrentWeekIntro />
                </Sequence>

                {/* Starts at 9 seconds, 5 seconds long */}
                <Sequence from={9 * 30} durationInFrames={5 * 30}>
    
                    <NumberNotesContent pastWeekBullets={pastWeekBullets.bullets} lifetimeBullets={lifetimeBullets.bullets}/>
                    
                    {/* Slow spinning dot effect, lasts duration of clip => 150 frames */}
                    <DotsDurationOfSequence from={0 * 30} durationInFrames={5 * 30}/>
                </Sequence>

                {/* <Slowed> */}
                        {/* <Dots /> */}
                        {/* <RedHearts />
                        <YellowHearts />
                        <Stars /> */}
                    {/* </Slowed> */}
                {/* Starts at 14 seconds, 4 seconds long */}
                <Sequence from={14 * 30} durationInFrames={4 * 30}>
                    {/* <StreakFall></StreakFall> */}
                    <ShowStreakContent streakCount={profData?.streaks.streakCount}/>
                </Sequence>


                <Audio volume={0.15} src={staticFile(background_music)} />
            </AbsoluteFill>
        </div>
    );
};

{/*

Outline

<intro>
hello person
this is your weekly dosage for current week

<content>
Number of notes past Week
Number of total notes



*/}


