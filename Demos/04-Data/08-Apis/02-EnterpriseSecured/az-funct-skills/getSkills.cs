using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Integrations
{
    public static class getSkills
    {
        [FunctionName("getSkills")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var skills = new List<object>{
                new { id= 1, name= "node.js", completed= true },
                new { id= 2, name= "typescript", completed= true }, 
                new { id= 3, name= "spfx", completed= true },
            };

            return (ActionResult)new OkObjectResult(skills);
        }
    }
}
