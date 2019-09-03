import textract from 'textract';

import Set from '../models/Set';

class SetHelper{

    getFileExtension(filename){
        return filename.split('.').pop();
    }

    getFolderName(folderName){
        return folderName.split("/")[0];
    }

    async setFolderContent(setId, folderString, isFirstFolder){
        let folderName = this.getFolderName(folderString);
        let updateObject = {};
        
        if (!isFirstFolder) {
            updateObject = {
                secondFile: {
                    name: folderName,
                    content: folderString
                }
            }
        } else {
            updateObject = {
                firstFile: {
                    name: folderName,
                    content: folderString
                }
            }
        }

        return await Set.findByIdAndUpdate(setId, updateObject);
    }

    async setFileContent(setId, fileName ,buffer, isFirstFile){
        const extension = this.getFileExtension(fileName);
        
        switch (extension) {
            case "txt":
                let content = buffer.toString();
                
                return await this.updateSet(setId, fileName, content, isFirstFile);
            case "pdf":
                return this.getContentByMimeType(buffer, "application/pdf", async (content) => {
                    await this.updateSet(setId, fileName ,content, isFirstFile);
                });
            case "doc":
                return this.getContentByMimeType(buffer, "application/msword", async (content) => {
                    return await this.updateSet(setId, fileName, content, isFirstFile);
                });
            case "docx":
                return this.getContentByMimeType(buffer, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", async (content) => {
                    return await this.updateSet(setId, fileName, content, isFirstFile);
                });
            default:
                break;
        }
    }

    getContentByMimeType(buffer, mimeType, callback){
        textract.fromBufferWithMime(mimeType, buffer, { preserveLineBreaks: true }, (err, text) => {
            callback(text);
        });
    }

    async updateSet(setId, fileName ,text, isFirstFile){
        let updateObject = {};
        

        if (!isFirstFile) {
            updateObject = {
                secondFile: {
                    name: fileName,
                    content: text
                }
            }
        } else {
            updateObject = {
                firstFile: {
                    name: fileName,
                    content: text
                }
            }
        }

        return await Set.findByIdAndUpdate(setId, updateObject);
    }
}

export default SetHelper;