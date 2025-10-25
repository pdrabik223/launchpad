


export const recordingToJson = (recording: [number, number][],
    duration: number,
) => {
    const recordingData = {
        recording: recording,
        duration: duration,
        created: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(recordingData, null, 2);

    return jsonString

}