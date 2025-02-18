import { env } from "../../../env";

export class RetrivePagesQuery {
  private environment = env.NODE_ENV || 'development';

  private getStatus = (draft = false) => {
    return {
      property: "Status",
      status: {
        equals: draft ? 'Draft' : 'Published',
      },
    }
  }

  private getEnviromment = () => {
    const database_envs = ['Development', 'Staging', 'Deployed']

    type DatabaseEnv = (typeof database_envs)[number];

    function getDatabaseEnv(_env?: string): DatabaseEnv {
      const nodeEnv = _env?.toLowerCase();

      if (nodeEnv === "development") return "Development";
      if (nodeEnv === "test" || nodeEnv === "staging") return "Staging";
      if (nodeEnv === "production") return "Deployed";

      throw new Error(`NODE_ENV inválido: ${env.NODE_ENV}`);
    }

    const currentEnvironment = getDatabaseEnv(this.environment);

    return {
      property: "Environments",
      select: {
        equals: currentEnvironment
      }
    }
  }


  public getPublishedPage = (slug: string) => {
    return [
      this.getStatus(),
      this.getEnviromment(),
      {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      }
    ]
  }



  public getDraftPage = (slug: string) => {
    return [
      this.getStatus(true),
      this.getEnviromment(),
      {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      }
    ]
  }


  public getPages = () => {
    return [
      this.getStatus(),
      this.getEnviromment(),
    ]
  }
}