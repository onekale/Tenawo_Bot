const TelegramBot = require('node-telegram-bot-api');
const { Client } = require('pg');

const pgClinet = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

pgClinet.connect().then(() => console.log('PostgreSQL connected successfully'))
.catch(err => console.error('Error connecting to PostgreSQL:', err));

const Token = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN  =  process.env.ADMIN_TOKEN;
const USER_ADMIN =  process.env.USER_ADMIN_TOKEN;

const bot = new TelegramBot(Token, {polling: true});

const keyboard = {
    inline_keyboard: [
        [{text: 'አማርኛ', callback_data:'amharic'},{text: 'English', callback_data:'english'}]
    ]
};

const keyboard2 = {
    inline_keyboard: [
        [{text: 'ድህር ገጻችንን ለማግኘት ይህን ይጫኑ', url: 'https://www.tenawo.com' }],
        [{text: 'ወደ አገልግሎት', callback_data: 'Service'}],
        [{text: '↪️ ተመለስ',callback_data: 'redirect_start'}]
          
    ]
}



const keyboard3 = {
    inline_keyboard: [
        [{text: '💊  መድኃኒት ፈልግ', callback_data: 'Drug'}],
        [{text: '🧑‍⚕️  ሐኪም', callback_data: 'Doctor'}],
        [{text: '📄  ሆስፒታል ቀጠሮ ማስያዝ', callback_data: 'feedback'}],
        [{text: '🔬  የላብራቶሪና የራዲዮሎጂ አገልግሎት', callback_data: 'feedback'}],
        [{text: '🏥  ክሊንክ', callback_data: 'feedback'}],
        [{text: '🚑  አንቡላንስ', callback_data: 'feedback'}]
    ] 
}

const keyboard4 = {
    inline_keyboard:[
        [{text: 'የመድኃኒቱን ስም ለመላክ', callback_data: 'Drug_Name'},{text: 'የመድኃኒት ማዘዣ ወረቀት በፎቶ ለመላክ', callback_data: 'Prescription'}],
        [{text: '↪️ ተመለስ', callback_data: 'feedback'}],
        [{text: '⏏️ ዋና ማውጫ', callback_data: 'redirect_start'}]
    ]

}

const keyboard5 = {
    inline_keyboard:[
        [{text: 'Get Our Website ', url: 'https://www.tenawo.com' }],
        [{text: 'Get Service', callback_data: 'E_Service'}],
        [{text: 'About Us', callback_data: 'About'}],
        [{text: '↪️ Menu: ',callback_data:  'feedback'}]
    ]
}

const keyboard6 = {
    inline_keyboard:[
        [{text: '💊  Search Drug', callback_data: 'E_Drug'}],
        [{text: '🧑‍⚕️  Doctor', callback_data: 'E_Doctor'}],
        [{text: '📄  Appointment', callback_data: 'feedback'}],
        [{text: '🔬  laboratory', callback_data: 'feedback'}],
        [{text: '🏥  Clinic', callback_data: 'feedback'}],
        [{text: '🚑  Ambulance', callback_data: 'feedback'}],
        [{text: '↪️ Back', callback_data:'feedback'},
        {text: '⏏️ Menu', callback_data: 'redirect_start'}]
       
    ]
}

const keyboard7 = {
    inline_keyboard:[
        [{text: 'To Send Drug Name', callback_data:'E_DrugName'}, {text: 'To send Prescription', callback_data: 'E_prescription'}],
        [{text: '↪️ Back', callback_data:'feedback'}],
        [{text: '⏏️ Menu', callback_data: 'redirect_start'}],
    ]

};
 
const keyboard8 = {
    inline_keyboard: [
        [{text: '↪️ Back', callback_data:'feedback'},{text: '⏏️ Menu', callback_data: 'redirect_start'}]
    ]
}

const keyboard9 = {
    inline_keyboard: [
        [{text: '↪️ ተመለስ', callback_data: 'feedback'},{text: '⏏️ ዋና ማውጫ', callback_data: 'redirect_start'}]
    ]
}

const keyboard10 = {
    inline_keyboard: [
        [{text: 'Online',callback_data: 'E-Online'},{text: 'Face to Face', callback_data: 'english'}]
    ]
}

const keyboard11 = {
    inline_keyboard: [
        [{text: 'በኦንላይን', callback_data: 'Online'}, {text: 'በአካል', callback_data: 'Directily'}]
    ]
}

const keyboard12 = {
    inline_keyboard: [
        [{text: 'Optional Send Photo ', callback_data: 'E_prescription'},{text: '⏏️ Menu', callback_data: 'redirect_start'}]
    ]
}

const keyboard13 = {
    inline_keyboard: [
        [{text: 'Dr Antenh', callback_data: 'Ant00'}, {text: 'Dr Mekedes', callback_data: 'Meke00'}],
        [{text: 'Dr Melkamu', callback_data: 'Melk00'},{text: 'Dr Meron', callback_data: 'Mer00'}]
    ]
}

const web = 'https://meet.google.com/landing?pli=1'



let previousMessageId = null;


bot.onText(/\/start/, (msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'ሰላም ✋ እንኳን ወደ ጤናዎ የዲጅታል ህክምና በሰላም መጡ!\n <b>እባክዎ ቋንቋ ይምረጡ</b>  \n welcome to your Tenawo digital health care! \n<b>select Language</b>',{
        parse_mode: 'HTML',
        reply_markup: JSON.stringify(keyboard)
    }).then(sentMessage => {
        previousMessageId = sentMessage.message_id;
    })
})


bot.on('callback_query', (callbackQuery)=>{

    if (callbackQuery.message.text === '/start') {
        return;
    }
    const data = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;

    if (previousMessageId){
        bot.deleteMessage(chatId, previousMessageId);
        previousMessageId = null;
    }


   switch(data) {
    case 'amharic':
        // Set language to Amharic
        bot.sendMessage(chatId,'እንኳን ወደ ጤናዎ የዲጅታል ህክምና እና አገልግሎት መስጫ የሞባይል መተግበሪያ እና ድህረ-ገጽ እንዲሁም 9456 የጥሪ ማዕከል በሰላም መጡ!',{
        reply_markup: JSON.stringify(keyboard2)}).then(sentMessage => {
            previousMessageId = sentMessage.message_id;
            
        });
        break;
        
     case 'english':
            // Set language to English
            bot.sendMessage(chatId,'Welcome! to your digital health  medical and service provider mobile app and website and 9456 call center',{
                reply_markup: JSON.stringify(keyboard5)
            }).then(sentMessage => {
                previousMessageId = sentMessage.message_id;
            })
            break;

     case 'Drug':
            bot.sendMessage(chatId, '<b>እባክዎን የፈለጉትን መድኃኒት በፈለጉት ትዕዛዝ ይላኩልን! 🤲</b>',{
            reply_markup: JSON.stringify(keyboard4),parse_mode: 'HTML'
              },
               ).then(sentMessage => {
            previousMessageId = sentMessage.message_id;
           })
           break;

    case 'Service':
        bot.sendMessage(chatId, '<b>እባክዎን የሚፈልጉተን የህክምና አይነት ወይም አገልግሎት ይምረጡ!</b>',{
            reply_markup:JSON.stringify(keyboard3), parse_mode: 'HTML'
         },
       ).then(sentMessage =>{
        previousMessageId = sentMessage.message_id;
       })
       break;

    case 'Drug_Name':
        bot.sendMessage(chatId,'እባክዎን የመድኃኒቱን ስም ያስገቡ',{
            reply_markup:JSON.stringify(keyboard9)
        });
        bot.on('message', (msg)=>{
            const chatId = msg.chat.id;
            const Sendername = msg.from.first_name;
            const Mtext = msg.text;
            bot.sendMessage(chatId, `<b>ስሞ :</b> ${Sendername} \n<b>ያስገቡት የመድኃኒት ስም ፡</b> ${Mtext }`, { parse_mode: 'HTML',  reply_markup:JSON.stringify(keyboard9) });
            // bot.sendMessage(kale, `<b>ስም :</b> ${Sendername} \n<b>መድኃኒቱ፡</b> ${Mtext } /n <b>እባክዎ ጥቂት ይታገሱ!</b> /n መድኃኒቱ እንደተገኘ እድንደወልሎ `, { parse_mode: 'HTML' });
          
            
        })
        break;

     case 'E_DrugName':
        bot.sendMessage(chatId,'Please enter the name of the drug'),
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const senderName = msg.from.first_name;
            const messageText = msg.text;
        
            if (messageText && chatId && senderName) {
                try {
                    
                    await pgClient.query(
                        'INSERT INTO drug_requests (chat_id, username, drug_name) VALUES ($1, $2, $3)',
                        [chatId, senderName, messageText]
                    );
        

                    await bot.sendMessage(
                        chatId,
                        `<b>Name :</b> ${senderName} \n<b>Name of the drug:</b> ${messageText}`,
                        { parse_mode: 'HTML', reply_markup: JSON.stringify(keyboard12) }
                    );
                } catch (error) {
                    console.error('Database query error:', error);
                    bot.sendMessage(chatId, 'An error occurred while processing your request.');
                }
            }
        }).then(sentMessage => {
            previousMessageId = sentMessage.message_id;
        })
        break;

        case 'redirect_start':
            bot.sendMessage(chatId, 'ሰላም ✋ እንኳን ወደ ጤናዎ የዲጅታል ህክምና በሰላም መጡ!\n <b>እባክዎ ቋንቋ ይምረጡ</b>  \n welcome to your Tenawo digital health care! \n<b>select Language</b>',{
                parse_mode: 'HTML',
                reply_markup: JSON.stringify(keyboard)
            }).then(sentMessage => {
                previousMessageId = sentMessage.message_id;
            })
            break;

        case 'Prescription':
            bot.sendMessage(chatId, 'እባክዎን የመድኃኒት ማዘዣውን በፎቶ ይላኩልን');
            bot.on('photo', (msg)=>{
                const chatId = msg.chat.id;
                const photoId = msg.photo[0].file_id; // Get the ID of the photo
                const SenderName = msg.from.first_name || '';
                const SenderUsername = msg.from.username || '';
                bot.sendMessage(chatId, `<b>ስሞ :</b> ${SenderName} \n<b>ያስገቡት ፎቶ መለያ ፡</b>`, { 
                    parse_mode: 'HTML',
                    replay_markup: JSON.stringify(keyboard8) }).then(() => {
                    const photoId = msg.photo[0].file_id; // Get the ID of the photo
                    bot.sendPhoto(chatId, photoId); // Resend the photo to the user
                });
                
                // bot.sendMessage(kale, `<b>ስም :</b> ${SenderName} \n<b>ያስገባው ፎቶ፡</b>`, { parse_mode: 'HTML' }).then(() => {
                //     const photoId = msg.photo[0].file_id; // Get the ID of the photo
                //     bot.sendPhoto(chatId, photoId); // Resend the photo to the user
                // });;
                
            })
            break;
            case 'E_prescription':
                bot.sendMessage(chatId, 'Please send us the prescription picture');
                bot.on('photo', (msg)=>{
                    const chatId = msg.chat.id;
                    const photoId = msg.photo[0].file_id; // Get the ID of the photo
                    const SenderName = msg.from.first_name || '';
                    const SenderUsername = msg.from.username || '';
                    bot.sendMessage(chatId, `<b>Name :</b> ${SenderName} \n<b>Data Successfully Inserted! </b>`, { parse_mode: 'HTML',
                reply_markup: JSON.stringify(keyboard8) }).then(() => {
                    const photoId = msg.photo[0].file_id;
                    bot.sendPhoto(chatId, photoId);
                });
                    
                    // bot.sendMessage(kale, `<b>Name :</b> ${SenderName} \n<b>Picture፡</b>`, { parse_mode: 'HTML' }).then(() => {
                    //     const photoId = msg.photo[0].file_id; // Get the ID of the photo
                    //     bot.sendPhoto(chatId, photoId); // Resend the photo to the user
                    // });;
                    
                })
                break;

                case 'E_Doctor':
                    bot.sendMessage(chatId, 'Available Doctors',{
                        parse_mode: 'HTML',
                        reply_markup: JSON.stringify(keyboard13)
                    })
                break;

                case 'Doctor':
                    bot.sendMessage(chatId, 'ዶክተሮን በምን አማራጭ ማግኘት ይፈልጋሉ', {
                        parse_mode: 'HTML',
                        reply_markup: JSON.stringify(keyboard11)
                    })

                    break;


            case 'E_Service':
                bot.sendMessage(chatId,'Please select the type of treatment or service you require',{
                    reply_markup: JSON.stringify(keyboard6)
                }).then(sentMessage => {
                    previousMessageId = sentMessage.message_id;
                })
                break;
                case 'E_Drug':
                    bot.sendMessage(chatId, 'Please send us name of Drug you want in you want format! 🤲 ',{
                        reply_markup: JSON.stringify(keyboard7)
                    }).then(sentMessage => {
                        previousMessageId = sentMessage.message_id;
                    })
                    break;
                case 'About': 
                bot.sendMessage(chatId, 'We are .......', {
                    replay_markup: JSON.stringify(keyboard8)}).then(sentMessage => {
                        previousMessageID = sentMessage.message_id;
                    })
                    break;

                    case 'Ant00':
                        bot.sendMessage(chatId, 'Get Doctor Anteneh',{
                            parse_mode: 'HTML',
                            reply_markup: JSON.stringify(keyboard10)
                        })
    
                    break;

                case 'E-Online': 
                bot.sendMessage(chatId, 'Get your Doctor Online', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: 'Open Google App',
                                    web_app: {url: web}
                                }
                            ]
                        ]
                    }
                })
        default:
            // Handle unknown callback data
            
            console.log('none');

   }

 
});

bot.on('contact', (msg) => {
    const chatId = msg.chat.id;
    const contact = msg.contact;
    bot.sendMessage(chatId,'Contact Infromation: ${JSON.stringify(contact)} '), { parse_mode: 'HTML'}
   
});





