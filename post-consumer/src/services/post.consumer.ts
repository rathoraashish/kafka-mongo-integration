import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/posts";

export const postConsumer = async () => {
    const messages: any[] = [];
    let processing = false;

    try {
        await kafkaConfig.subscribeTopic('post');
        await kafkaConfig.consume(async(message) => {
            messages.push(message);
            console.log("Message received", message);

            if(messages.length > 100){
                //TODO: save into database : bulk insertion
                processMessages();
            }
        })

        setInterval(processMessages, 5000) //save messages in every 5 seconds
    } catch (error) {
        
    }

    async function processMessages(){
        if(messages.length > 0 && !processing){
            processing = true;
            const batchToProcess = [...messages]
            messages.length = 0;
            
            try {
                await PostModel.insertMany(batchToProcess, {ordered: false})
                console.log("Bulk insetion done")
            } catch (error) {
                console.log("Error inserting message", error);
                messages.push(...batchToProcess); //again try to save the message if error occured
            } finally {
                processing = false;
            }
        }
    }
}

