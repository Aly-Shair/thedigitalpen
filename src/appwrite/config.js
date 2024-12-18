import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
    client;
    databases;
    storage;
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client);
    }

    // post uploading
    async createPost({ title, slug, description, featuredImageId, status, userId }) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    description,
                    featuredImageId,
                    status,
                    userId
                }
            );
            if (post)
                return post;

        } catch (error) {
            console.log("Post cannot be created due to Error: " + error);
            throw error;
        }

        return null;
    }

    async getPost(postid) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid,
            );

        } catch (error) {
            console.log("Post cannot be list due to Error: " + error);
            return null;
            throw error;
        }
    }

    async deletePost(postid) {
        try {
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid,
            );

            if (result)
                return true;

        } catch (error) {
            console.log("Post cannot be deleted due to Error: " + error);
            return false;
        }

    }

    async listPosts(querie = [Query.equal('status', true)]) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // [Query.select('status', true)] // queries (optional)
                // [Query.equal('status', true)] // queries (optional)
                // querie
                // queries (optional)
            );
            if (result)
                return result;

        } catch (error) {
            console.log("Posts cannot be list due to Error: " + error);
            throw error;
        }

        return null;
    }

    async updatePost(postid, { title, slug, description, featuredImageId, status, userid }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postid,
                {
                    title,
                    slug,
                    description,
                    featuredImageId,
                    status,
                    userid
                }
            );

            if (result)
                return result;

        } catch (error) {
            console.log("Posts cannot be update due to Error: " + error);
        }

        return null;
    }
    // file uploading
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("File cannot be created due to Error: " + error);
            throw error;
        }
        return null;
    }

    async deleteFile(fileid) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileid,
            );

        } catch (error) {
            console.log('file cannot be deleted due to error: ' + error);
        }
        return null;
    }

    getFilePreview(fileid) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileid,
        );
    }

    // comments uploading

    async createComment(
        {
            comment,
            postId,
            userId,
            commentImageId,
            userName
        }
        ){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    comment,
                    postId,
                    userId,
                    commentImageId,
                    userName
                }
            );

        } catch (error) {
            console.log("comment cannot be posted due to Error: " + error);
            throw error;
        }

        return null;
    }

    // async getCommnet(commentId) {
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCommentsCollectionId,
    //             commentId,
    //         );

    //     } catch (error) {
    //         console.log("Post cannot be list due to Error: " + error);
    //         throw error;
    //     }
    // }

    async deleteComment(commentId) {
        try {
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId,
            );

            if (result)
                return true;

        } catch (error) {
            console.log("Post cannot be deleted due to Error: " + error);
            return false;
        }

    }

    async getComments() {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
            );
            if (result)
                return result;

        } catch (error) {
            console.log("Comments cannot be list due to Error: " + error);
            throw error;
        }

        return null;
    }

    async editComment(commentId, {
        comment,
        postId,
        userId,
        commentImageId,
        userName
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId,
                {
                    comment,
                    postId,
                    userId,
                    commentImageId,
                    userName
                }
            );

        } catch (error) {
            console.log("Posts cannot be update due to Error: " + error);
            throw error;
        }
    }
    // comments image
    async uploadCommentImage(commentFile) {
        try {
            return await this.storage.createFile(
                conf.appwriteCommentsBucketId,
                ID.unique(),
                commentFile
            );
        } catch (error) {
            console.log("File cannot be uploaded due to Error: " + error);
            throw error;
        }
    }

    async deleteCommnetImage(commentImageId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteCommentsBucketId,
                commentImageId,
            );

        } catch (error) {
            console.log('file cannot be deleted due to error: ' + error);
        }
        return null;
    }

    getCommentFilePreview(commentImageId) {
        return this.storage.getFilePreview(
            conf.appwriteCommentsBucketId,
            commentImageId,
        );
    }


    // section for comment replys

    async createReply({ reply, userName, userId, postId, commentId, replyImageId }) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsReplysCollectionId,
                ID.unique(),
                { 
                    reply, 
                    userName, 
                    userId, 
                    postId, 
                    commentId, 
                    replyImageId 
                }
            );
            if (result)
                return result;

        } catch (error) {
            console.log("reply cannot be created due to Error: " + error);
            throw error;
        }

        return null;
    }


    async deleteReply(replyId) {
        try {
            const result = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsReplysCollectionId,
                replyId,
            );

            if (result)
                return true;

        } catch (error) {
            console.log("reply cannot be deleted due to Error: " + error);
            return false;
        }

    }

    async listReplys() {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsReplysCollectionId,
            );
            if (result)
                return result;

        } catch (error) {
            console.log("replys cannot be list due to Error: " + error);
            throw error;
        }

        return null;
    }


}

const configService = new Service();
export default configService;