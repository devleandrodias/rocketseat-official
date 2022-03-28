import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const QueueUrl = "https://sqs.us-east-1.amazonaws.com/777632128622/MyQueue";

const sendSqs = function () {
  const params: AWS.SQS.SendMessageRequest = {
    QueueUrl,
    DelaySeconds: 0,
    MessageBody: JSON.stringify({
      id: "83fa61d0-eff4-4a48-93db-ff0f0a9e902a",
      name: "iPhone 13 Pro Max",
      description: "Apple iPhone 13 Pro Max",
      price: 1499,
    }),
    MessageAttributes: {
      Product_1: {
        DataType: "String",
        StringValue: "Macbook Air M1",
      },
      Product_2: {
        DataType: "String",
        StringValue: "Macbook Pro M2 Max",
      },
      Product_3: {
        DataType: "String",
        StringValue: "Mac Mini M1",
      },
    },
  };

  sqs.sendMessage(params, function (err, data) {
    err ? console.error(err) : console.log(JSON.stringify(data));
  });
};

sendSqs();
